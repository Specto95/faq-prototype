
💡 Tiempo Invertido --> ~5 horas
---

### Decisión de vectorización**
En el archivo vectorizer.py en la función `vectorize_text()`:

```python
def vectorize_text(text: str) -> list:
    # Diseño no trivial:
    # En lugar de usar un modelo pesado (embeddings o TF-IDF completo),
    # elegí hashing + frecuencia normalizada.
    # Esto cumple el requisito de no depender de servicios externos
