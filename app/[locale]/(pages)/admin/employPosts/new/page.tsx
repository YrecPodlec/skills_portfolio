'use client'
import React from 'react';

const Page = () => {
    const [name, setName] = React.useState('');
    const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
    const handleClick = async () => {
        try {
            const res = await fetch(`/api/admin/employer-post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({post: name}),
            });
            if (!res.ok) throw new Error();
            setName('')
            setStatus('success')
        } catch (err){
            setStatus('error');
        }
    }
    return (
        <div>
            <label>Название должности</label>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleClick}>ОТПРАВИТЬ</button>
            {status === 'success' && <p>Должность добавлена!</p>}
            {status === 'error' && <p>Ошибка, попробуйте снова</p>}
        </div>
    );
};

export default Page;