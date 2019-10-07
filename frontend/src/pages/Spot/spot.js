import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './spot.css';

export default function Spot({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const previewThumbnail = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        await api.post('/spots', data, { headers: { user_id } });
        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className={thumbnail?'has-thumbnail':''} id="thumbnail" 
                style={{ backgroundImage: `url(${previewThumbnail})` }}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="camera" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input id="company" placeholder="Nome da sua empresa" 
                value={company} onChange={event => setCompany(event.target.value)} />

            <label htmlFor="techs">TECNOLOGIAS <span>(separadas por vírgula)</span> *</label>
            <input id="techs" placeholder="Tecnologias utilizadas" 
                value={techs} onChange={event => setTechs(event.target.value)} />

            <label htmlFor="price">VALOR DA DIÁRIA <span>(em branco para gratuito)</span> *</label>
            <input id="price" placeholder="Valor cobrado por dia" 
                value={price} onChange={event => setPrice(event.target.value)} />

                <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}