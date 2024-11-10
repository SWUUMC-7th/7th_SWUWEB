import styled from "styled-components";
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Container = styled.div`
    margin-top:50px;
    margin-bottom: 50px;
    width:100%;
    display:flex;
    justify-content: center;
    color:red;
`;

const InfiniteDiv = forwardRef(({children}, ref) => {
    return (
        <Container ref={ref}>
            {children}
        </Container>
    );
});

InfiniteDiv.displayName = 'InfiniteDiv';

InfiniteDiv.propTypes = {
    children: PropTypes.node,
};

export default InfiniteDiv;
