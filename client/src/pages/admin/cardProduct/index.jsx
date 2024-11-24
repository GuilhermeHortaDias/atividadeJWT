import React from 'react';
import './index.css';

export const ProductCard = ({ produto, onDelete, onEdit }) => {
  return (
    <article className="card">
      <section className="card__hero">
    
        <img 
          src={produto.image} 
          alt={produto.name} 
          className="card__image" 
        />
        <header className="card__hero-header">
          <span>R${produto.price}</span>
          <div className="card__icon" onClick={() => onDelete(produto.id)} style={{ cursor: 'pointer' }}>
            <svg
              height="30"
              width="30"
              stroke="red"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h18M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6M10 6V4a2 2 0 012-2h0a2 2 0 012 2v2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </header>

        <p className="card__job-title">{produto.description}</p>
        <p className="card__job-quantity">Quantidade: {produto.quantity}</p>
      </section>

      <footer className="card__footer">
        <div className="card__job-summary">
          <div className="card__job">
            <p className="card__job-title">
              {produto.name}
            </p>
          </div>
        </div>

        <button className="card__btn" onClick={() => onEdit(produto.id)}>Editar</button>
      </footer>
    </article>
  );
};
