import React from 'react';
import PaintingCard from '../PaintingCard';

const PaintingComponent = ({ painting }) => {
    return (
        <div>
            <PaintingCard painting={painting} showDescription disableClick />
        </div>
    );
};

export default PaintingComponent;
