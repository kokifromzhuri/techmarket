from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import Base, engine
from app.models.user import User
from app.models.product import Product
from app.routers.auth import router as auth_router
from app.routers.products import router as products_router


app = FastAPI(
    title="TechMarket API",
    version="1.0.0",
)

app.mount(
    "/product-images",
    StaticFiles(directory="../frontend/public/products"),
    name="product-images",
)

app.mount(
    "/products",
    StaticFiles(directory="../frontend/public/products"),
    name="product-images",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(products_router)


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health_check():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "ok",
        "database": "connected",
        "service": "TechMarket API",
    }
