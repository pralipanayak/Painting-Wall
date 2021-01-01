import React from 'react';
import JumbotronComponent from '../../components/Jumbotron';
import PaintingsComponent from '../../components/Paintings';

const PaintingsPage = () => {
    return (
        <div>
            <JumbotronComponent
                title="Find a best painting for you."
                subtitle="Our best artworks of high quality at unbelievably low prices. You simply can't resist them. Use coupon DIWALI to get more 10% off."
            />
            <PaintingsComponent />
        </div>
    );
};

export default PaintingsPage;
