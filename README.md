# FAQ Search Prototype (FastAPI + Next.js 14 + Vector Search)

Este prototipo implementa un buscador de preguntas frecuentes usando FastAPI y Next.js.  
La vectorización se realiza con hashing + bolsa de palabras normalizada (TF-style), una técnica “suficientemente buena” para un MVP porque:

1. No requiere modelos externos (cumple las reglas),
2. Es rápida, determinista y reproducible,
3. Captura similitud léxica relevante para consultas cortas,
4. Permite escalar fácilmente a modelos más avanzados.

### **Cómo ejecutar**

```bash
git clone git@github.com:Specto95/faq-prototype.git
cd faq-prototype/
docker compose up --build
```
