import hashlib
import numpy as np

VECTOR_SIZE = 128


def _hash_token(token: str) -> int:
    """Hash estable por token → índice entre 0 y 127."""
    h = hashlib.md5(token.encode("utf-8")).hexdigest()
    return int(h, 16) % VECTOR_SIZE


def vectorize_text(text: str) -> list:
    vector = np.zeros(VECTOR_SIZE)

    tokens = text.lower().split()

    for tok in tokens:
        idx = _hash_token(tok)
        vector[idx] += 1

    # normalizar para que magnitudes sean comparables
    norm = np.linalg.norm(vector)
    return (vector / norm).tolist() if norm > 0 else vector.tolist()


def cosine_similarity(a: list, b: list) -> float:
    a = np.array(a)
    b = np.array(b)
    denom = (np.linalg.norm(a) * np.linalg.norm(b))
    if denom == 0:  # evaluar si la suma de raices del denominador es 0
        return 0.0
    return float(np.dot(a, b) / denom)
