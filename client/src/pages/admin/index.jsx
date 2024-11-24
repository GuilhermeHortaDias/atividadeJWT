// App.js
import { useState, useEffect } from 'react';
import './index.css'
import api from '../../api/api';
import EditProduct from './edit';
import { Link } from 'react-router-dom';
import { ProductCard } from './cardProduct';


export function Admin() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [editingProduto, setEditingProduto] = useState(null); 


    useEffect(() => {
        loadProdutos();
    }, []);

    const loadProdutos = async () => {
        try {
            const response = await api.get('/produto');
            // Ajusta as URLs das imagens
            const produtosComImagens = response.data.map(produto => ({
                ...produto,
                image: `http://localhost:5000/${produto.image}`
            }));
            setProdutos(produtosComImagens);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };
    

    const onDelete = async (id) => {
        try {
            await api.delete(`/produto/${id}`);
            loadProdutos();
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };
    const onEdit = (id) => {
      window.open(`/edit-product/${id}`, '_blank'); 
    };
    

    return (
        <div className='main-home'>

            <div className="create-product">
                <h2>Quer criar um novo produto? </h2>
                <Link to="/create-product" className='button2'>
                    ADICIONAR
                </Link>
            </div>


            <h2>Lista de Produtos</h2>
            <div className='mananger-container'>
                <div className='general-container'>
                    {produtos.map(produto => (
                        <ProductCard key={produto.id} produto={produto} onDelete={onDelete}  onEdit={onEdit}/>
                    ))}
                </div >
            </div>
       
            



        </div>
    );
}


