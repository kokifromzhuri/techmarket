from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.get("")
def get_products(
    db: Session = Depends(get_db),
):
    products = db.scalars(
        select(Product)
        .where(Product.is_active == True)
        .order_by(Product.created_at.desc())
    ).all()

    return products


@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = db.scalar(
        select(Product).where(
            Product.id == product_id,
            Product.is_active == True,
        )
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return product
