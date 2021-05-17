import { refs } from './objects-refs';
import { fetchData } from './serviceApi';
    
    
    // paginationContainer --> container
    // paginationBtn --> кнопка


fetchData.then(data => {
    const allPages = data.page.totalPages;
    console.log(allPages);
    let arrPageNumbers = [];
    for (let i = 1; i < allPages - 1; i += 1){
        arrPageNumbers.push(i);
    };
    const arrFilterNumber = arrPageNumbers.filter(num => num < 6);
    console.log(arrFilterNumber);
});


