import React from "react";

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
        <div>
            <button onClick={onLeftClick}>{"<"}</button>
            <p>{`${currentPage}/${totalPages || 12 }`}</p>
            <button onClick={onRightClick}>{">"}</button>
        </div>
    )
}