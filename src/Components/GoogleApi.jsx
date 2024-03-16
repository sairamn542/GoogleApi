import React, { useState, useEffect } from 'react';

function GoogleApi() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://api.restful-api.dev/objects');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <table className='table table-striped table-bordered'>
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>
                                    {product.data && Object.entries(product.data).map(([key, value]) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GoogleApi;
