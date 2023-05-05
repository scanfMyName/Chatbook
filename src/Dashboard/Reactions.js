import React, { useState } from 'react';

export const Reactions = (props) => {
    const [countLike, setCountLike] = useState(0);
    const [countDisLike, setCountDisLike] = useState(0);
    function incLike() {
        setCountLike(prevlike => prevlike + 1);
    }
    function incDisLike() {
        setCountDisLike(prevDislike => prevDislike + 1);
    }
    

    return (
        <div className='reacts'>
            <button
                className='like-btn'
                onClick={incLike}>
                Like:</button><span>{countLike}</span>
            <button
                className='dislike-btn'
                onClick={incDisLike}>
                Dislike:</button><span>{countDisLike}</span>
        </div>
    )
}
