import { LinkContainer } from 'react-router-bootstrap'
import { Pagination } from 'react-bootstrap'

const Paginate = ({ pageObj, keyword='', isAdmin=false }) => {
    const {number, pageRange, limit} = pageObj
    return (
        pageRange > 1 && (
            <Pagination>
                {[...Array(pageRange).keys()].map(page => (
                    <LinkContainer 
                        key={page+1} 
                        to={
                            !isAdmin ? (
                                keyword ? 
                                `/search/${keyword}?page=${page+1}&limit=${limit}` : 
                                `/?page=${page+1}&limit=${limit}`
                            ) : (
                                `/admin/products?page=${page+1}&limit=${limit}`
                            )
                        }>
                        <Pagination.Item active={page+1 === number}>
                            {page+1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
