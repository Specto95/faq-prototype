from pydantic import BaseModel

class FAQRequest(BaseModel):
    question: str
    answer: str

class SearchRequest(BaseModel):
    query: str

class FAQResponse(BaseModel):
    id: int
    question: str
    answer: str