from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import FAQRequest, FAQResponse, SearchRequest
from vectorizer import cosine_similarity, vectorize_text
from db import FAQ_DB

app = FastAPI(
    title="Q-Finder API",
    description="Prototipo de busquedas FAQ por similitud coseno"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = FAQ_DB()


@app.get("/api/faqs", response_model=list[FAQResponse])
def get_faqs():
    return db.faqs


@app.post('/api/faq', response_model=FAQResponse)
def create_faq(faq: FAQRequest):
    vector = vectorize_text(faq.question)
    saved = db.save_faq(faq.question, faq.answer, vector)
    return saved


@app.post('/api/search', response_model=FAQResponse)
def search_faq(query: SearchRequest):
    if not db.faqs:
        raise HTTPException(status_code=404, detail="FAQ no registrada")

    query_vec = vectorize_text(query.query)

    best_faq = None
    best_score = -1

    for faq in db.faqs:
        score = cosine_similarity(query_vec, faq["vector"])
        if score > best_score:
            best_score = score
            best_faq = faq
    return FAQResponse(**best_faq)
