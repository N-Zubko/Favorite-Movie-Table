import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import MoviePopup from './moviePopup';

import axios from "axios";

const url = "https://skyit-coding-challenge.herokuapp.com/movies";

const MovieTable = () => {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({
        'title': { value: '', matchMode: FilterMatchMode.STARTS_WITH},
        'releaseDate': { value: '', matchMode: FilterMatchMode.CONTAINS},
        'length': { value: '', matchMode: FilterMatchMode.STARTS_WITH},
        'rating': { value: '', matchMode: FilterMatchMode.STARTS_WITH},
        'certification': { value: null, matchMode: FilterMatchMode.EQUALS},
        'director': { value: null, matchMode: FilterMatchMode.EQUALS},
    });
    
    useEffect(() => {
      axios
        .get(url)
        .then((res) => setMovies(res.data));
    }, []);

   
   const [cardPopup, setCardPopup] = useState(false);
   const [movieDetails, setMovieDetails] = useState(null);

    const formatRating = (value) => {
        const percentageRating=(value/5*100).toFixed(2)+"%"
        return percentageRating;
    }
    const ratingBodyTemplate = (rowData) => {
        return formatRating(rowData.rating);
    }
    const [selectedMovie, setSelectedMovie] = useState(null);

    const directorBodyTemplate = (rowData) => {
        const director = rowData.director;
        return (
            <React.Fragment>
                <span>{director}</span>
            </React.Fragment>
        );
    }

    const directorRowFilterTemplate = (options) => {
        return (
            <MultiSelect 
                value={options.value} 
                options={directors} 
                itemTemplate={directorsItemTemplate} 
                onChange={(e) => options.filterApplyCallback(e.value)} 
                optionLabel="name" 
                placeholder="All" 
                className="p-column-filter" 
                maxSelectedLabels={1} />
        );
    }

    const directorsItemTemplate = (option) => {
        return (
            <div className="p-multiselect-director-option">
                <span>{option}</span>
            </div>
        );
    }

    const certificationRowFilterTemplate = (options) => {
         return (
            <Dropdown 
                value={options.value} 
                options={certifications} 
                onChange={(e) => options.filterApplyCallback(e.value)} 
                itemTemplate={certificationItemTemplate} 
                placeholder="Select certification" 
                showClear />
        );
    }
    const certifications = [
        'General', 'CA-PG', '14 Accompaniment'];

    const directors = [
        'John Carney', 'Patty Jenkins', 'Travis Fine', 'Amy Poehler', 'David Ayer', 'Zack Snyder', 'Ryan Coogler', 'Pete Docter', 'Luc Besson'];
        
    const certificationItemTemplate = (option) => {
        return (
            <span 
                className={`certification-badge status-${option}`}>{option}
            </span>
        )}

    const certificationBodyTemplate = (rowData) => {
        return <span className={`certification-badge status-${rowData.certification}`}>{rowData.certification}</span>;
    }

    // const ratingFilterTemplate = () => {

    // }

    const movieSelected = (data) => {
        setCardPopup(true);
        setMovieDetails(data.value);
        console.log("selected movie details: " ,  data.value);
    }

  return (
    <div>
      <DataTable 
        value={movies}
        filters={filters}
        filterDisplay="row" 
        dataKey="title"
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        paginator
        rows={10}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} movies"
        emptyMessage="No data found."
        selection={selectedMovie}
        selectionMode="single"
        onSelectionChange={movieSelected}
        >
        <Column 
            selectionMode="single" 
            headerStyle={{width: '3em'}} 
            />
        <Column 
            field="title" 
            header="Title" 
            filter 
            filterPlaceholder="Search by title" 
            style={{ minWidth: '20rem' }} 
            />
        <Column 
            field="releaseDate" 
            header="Year" 
            filter 
            filterPlaceholder="Search by year" 
            style={{ minWidth: '20rem' }} 
            />
        <Column 
            field="length" 
            header="Running Time" 
            filter 
            filterPlaceholder="Search by time" 
            style={{ minWidth: '20rem' }} 
            />
        <Column 
            field="director" 
            header="Director" 
            showFilterMenu={false} 
            filterMenuStyle={{ width: '14rem'}} 
            style={{ minWidth: '14rem' }} 
            body={directorBodyTemplate}
            filter 
            filterElement={directorRowFilterTemplate}
            />
        <Column 
            field="certification" 
            header="Certification" 
            howFilterMenu={false} 
            filterMenuStyle={{ width: '14rem'}} 
            style={{minWidth: '12rem'}} 
            body={certificationBodyTemplate} 
            filter 
            filterElement={certificationRowFilterTemplate} 
            />
        <Column 
            field="rating" 
            header="Rating" 
            body={ratingBodyTemplate} 
            filter 
            filterPlaceholder="Search by rating"
            style={{ minWidth: '20rem' }}
            />
      </DataTable>
      < MoviePopup trigger={cardPopup} setTrigger={setCardPopup}/>
    </div>
  );
};

export default MovieTable;