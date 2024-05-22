import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const SortableTableHeader = ({
  columnName,
  sortColumn,
  sortDirection,
  handleSort,
}) => (
  <th onClick={() => handleSort(columnName)}>
    {columnName}
    {sortColumn === columnName && (
      <FontAwesomeIcon
        icon={sortDirection === "asc" ? faSortUp : faSortDown}
        className={`sort-icon ${sortDirection === "asc" ? "asc" : "desc"}`}
        style={{
          color: "#007bff",
          cursor: "pointer",
          marginLeft: "5px",
        }}
      />
    )}
    {sortColumn !== columnName && <FontAwesomeIcon icon={faSort} />}
  </th>
);

export default SortableTableHeader;
