import React from "react";
import './Pagination.css';

export const Pagination = ({totalPages, currentPage, setCurrentPage}) => {

    const onLeftClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } 
    }

    const onRightClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="home-pagination">
            <button onClick={onLeftClick} className="pagination-btn">{"<"}</button>
            <p className="pagination-label">{`${currentPage}/${totalPages || 1 }`}</p>
            <button onClick={onRightClick} className="pagination-btn">{">"}</button>
        </div>
    )
}