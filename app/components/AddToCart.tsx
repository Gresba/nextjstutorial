'use client';
import React from 'react'

const AddToCart = () => {
  return (
    <div>
        <button className='btn btn-primary' onClick={() => alert('Product Added to Cart')}>
            AddToCart
        </button>
    </div>
  )
}

export default AddToCart