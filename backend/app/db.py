# Decisión de diseño:
# Las FAQs viven en memoria. Evito una base de datos para cumplir el requisito
# de un prototipo simple y arrancable vía Docker sin servicios adicionales.
# El código queda desacoplado para agregar persistencia real más adelante.

import json
from pathlib import Path
from vectorizer import vectorize_text

class FAQ_DB:
    def __init__(self, load_seed=True):
        self.faqs = []
        self.counter = 1;

        if load_seed:
            self._load_seed()

    def _load_seed(self):
        seed_path = Path(__file__).parent / "seed.json"
        if not seed_path.exists():
            return
        
        with open(seed_path, "r", encoding="utf-8") as f:
            seed_data = json.load(f)

        for item in seed_data:
            vector = vectorize_text(item["question"])
            self.save_faq(item["question"], item["answer"], vector)

    def save_faq(self, question, answer, vector):
        faq = {
            "id": self.counter,
            "question": question,
            "answer": answer,
            "vector": vector
        }
        self.faqs.append(faq)
        self.counter += 1
        return faq
