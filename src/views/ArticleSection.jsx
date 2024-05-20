import React, { useState } from 'react';
import '../assets/scss/articlesection.scss';

const ArticleSection = () => {
  const [articles, setArticles] = useState([
    {
      "id": 1,
      "title": "Introducción a la impresión 3D",
      "content": "La impresión 3D es una tecnología que permite crear objetos tridimensionales a partir de un modelo digital. Consiste en la superposición de capas sucesivas de material hasta formar el objeto deseado...",
      "likes": 25,
      "dislikes": 3,
      "comments": [
        {
          "id": 1,
          "text": "¡Gran artículo introductorio!"
        },
        {
          "id": 2,
          "text": "Me gustaría saber más sobre los diferentes tipos de impresoras 3D."
        }
      ]
    },
    {
      "id": 2,
      "title": "Mejores impresoras 3D para principiantes",
      "content": "Si estás iniciándote en el mundo de la impresión 3D, estas son algunas de las mejores impresoras para principiantes: Creality Ender 3, Prusa Mini, Anycubic Mega Zero...",
      "likes": 42,
      "dislikes": 1,
      "comments": [
        {
          "id": 3,
          "text": "Yo tengo la Ender 3 y es genial para empezar."
        },
        {
          "id": 4,
          "text": "¿Cuál es la mejor opción calidad-precio?"
        }
      ]
    },
    {
      "id": 3,
      "title": "Materiales de impresión 3D",
      "content": "Existen diversos materiales utilizados en la impresión 3D, cada uno con sus propias características y aplicaciones. Algunos de los más comunes son: PLA (ácido poliláctico), ABS (acrilonitrilo butadieno estireno), PETG (tereftalato de polietileno), TPU (poliuretano termoplástico)...",
      "likes": 18,
      "dislikes": 0,
      "comments": [
        {
          "id": 5,
          "text": "¿Cuál es el material más fácil de imprimir para principiantes?"
        },
        {
          "id": 6,
          "text": "Me encanta la flexibilidad del TPU para ciertos proyectos."
        }
      ]
    },
    {
      "id": 4,
      "title": "Aplicaciones de la impresión 3D en la medicina",
      "content": "La impresión 3D ha revolucionado el campo de la medicina, permitiendo la creación de prótesis personalizadas, implantes, modelos anatómicos para planificación quirúrgica y hasta la bioimpresión de tejidos y órganos...",
      "likes": 35,
      "dislikes": 2,
      "comments": [
        {
          "id": 7,
          "text": "Es increíble cómo la impresión 3D está mejorando la calidad de vida de muchas personas."
        },
        {
          "id": 8,
          "text": "La bioimpresión es el futuro de la medicina regenerativa."
        }
      ]
    },
    {
      "id": 5,
      "title": "Consejos para el mantenimiento de impresoras 3D",
      "content": "Para mantener tu impresora 3D en óptimas condiciones, es importante seguir algunos consejos de mantenimiento: lubricar regularmente las partes móviles, limpiar la boquilla y la cama de impresión, verificar la tensión de las correas, actualizar el firmware...",
      "likes": 29,
      "dislikes": 1,
      "comments": [
        {
          "id": 9,
          "text": "¡Gracias por los consejos! Me han sido muy útiles."
        },
        {
          "id": 10,
          "text": "¿Cada cuánto tiempo se recomienda lubricar las partes móviles?"
        }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  

  const handleLike = (articleId) => {
    // Lógica para manejar el "me gusta" de un artículo
  };

  const handleDislike = (articleId) => {
    // Lógica para manejar el "no me gusta" de un artículo
  };

  const handleComment = (articleId, commentText) => {
    // Lógica para manejar la publicación de un comentario en un artículo
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredArticles = articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const contentMatch = article.content.toLowerCase().includes(searchQuery.toLowerCase());
  
    if (selectedFilter === 'popular') {
      return (titleMatch || contentMatch) && article.likes >= 20;
    } else if (selectedFilter === 'recent') {
      // Lógica para filtrar artículos recientes (por ejemplo, por fecha de creación)
      return titleMatch || contentMatch;
    } else {
      return titleMatch || contentMatch;
    }
  });

  return (
    <div className="article-section">
      <h2>Artículos</h2>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="">Todos los artículos</option>
          <option value="popular">Artículos populares</option>
          <option value="recent">Artículos recientes</option>
        </select>
      </div>
      <div className="article-list">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <div className="article-actions">
              <button onClick={() => handleLike(article.id)}>
                Me gusta ({article.likes})
              </button>
              <button onClick={() => handleDislike(article.id)}>
                No me gusta ({article.dislikes})
              </button>
            </div>
            <div className="comment-section">
              <h4>Comentarios</h4>
              {article.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  {comment.text}
                </div>
              ))}
              <input
                type="text"
                placeholder="Escribe un comentario..."
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleComment(article.id, event.target.value);
                    event.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;