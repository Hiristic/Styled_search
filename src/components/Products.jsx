import React, { useState } from 'react';

import { ModalContext } from './Modal';

const Products = ({ children }) => (
  <div className="line-up u-word-break">{children}</div>
);

const Product = ({ result: product }) => {
   const title = product.produkt.raw //.replace(/&amp;/gi, '&').replace(/&shy;/gi, '­');

  return (
    <ModalContext.Consumer>
      {({ openModal, updateModal }) => {
        // Some older years don't have enough product info for a modal
        // - these should link directly to their website
        const hasProductModal = 'true' //!(product.modal && product.modal.raw === 'false');
        const openProductModal = () => {
          updateModal(product);
          openModal();
        };
        /* TODO remove not needed there should allways be enough data
        const clickAction = hasProductModal
          ? { onClick: openProductModal }
          : {
              href: product.leverantor.raw,
              target: '_blank',
              rel: 'noreferrer noopener',
            };
*/

        const clickAction = { onClick: openProductModal }
        return (
          <a className="product" {...clickAction}>
            {/*<img src={product.logo.raw} alt={title} />*/}
            <div className="product__overlay">
              <h3 className="product__title">{title}</h3>
              <h4 className="product__studio">{product.kategori.raw}</h4>
            </div>
          </a>
        );
      }}
    </ModalContext.Consumer>
  );
};

const ProductModal = ({ product }) => {
  const ingredienser_list = product.ingredienser_list.raw || [];

  return (
    <article className="product-modal">

      <section className="product-modal__copy">
        <h1>{product.produkt.raw}</h1>

        <ul className="product-modal__details">
          <li>
            <strong>Kategori:</strong> {product.kategori.raw}
          </li>
          <li>
            <strong>Innehåll:</strong> {product.ingredienser.raw}
          </li>
          {ingredienser_list && (
            <li>
              <strong>Ingredienser:</strong> {ingredienser_list.join(', ')}
            </li>
          )}
        </ul>

        <div dangerouslySetInnerHTML={{ __html: product.produkt.raw }}></div>

        <a
          className="product-modal__cta button button--important"
          href={product.leverantor.raw}
          target="_blank"
          rel="noopener noreferrer"
        >
          Spara produkt
        </a>
      </section>
    </article>
  );
};

export { Products, Product, ProductModal };
