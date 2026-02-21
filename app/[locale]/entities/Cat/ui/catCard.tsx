import React from 'react';
import {Cat} from "@/app/[locale]/entities/Cat/model/cat";

type Props = {cat: Cat}

const CatCard = ({cat}: Props) => {
    return (
        <article>
            <header>
                <h1>
                    {cat.name}
                </h1>
            </header>

            <figure>
                <img src={cat.image} alt={cat.name} width="150px" style={{aspectRatio: "1/1"}}/>
                <p>{cat.description}</p>
            </figure>

            <section>
                <dl>
                    <dt>Возраст</dt>
                    <dd>{cat.age}</dd>

                    <dt>Цена</dt>
                    <dd>{cat.price}</dd>

                    <dt>Цвет</dt>
                    <dd>{cat.color}</dd>
                </dl>
            </section>

            <footer>
                <div>В наличии: {cat.count > 0 ? "YES" : "NO"}</div>
                {
                    cat.count <=0 ? null : (<button>ЗАКАЗАТЬ</button>)
                }

            </footer>
        </article>
    );
};

export default CatCard;