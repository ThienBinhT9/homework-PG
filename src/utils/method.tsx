import React from 'react'

import {GENDERS, STATUS} from './constants.ts'
import { IGenderParams, ILocationParams, ISearchParams } from '../interfaces/common-interface.ts'
import {IProduct} from '../interfaces/payroll-interface.ts'

export const renderGender = ({text}) => {
    
    const output:React.JSX.Element[] = [
        <option key={999} value={text.toLocaleLowerCase()} disabled>{text}</option>
    ]

    GENDERS.forEach((gender: IGenderParams, index: number) => {
        output.push(
            <option key={index} value={gender.value}>{gender.label}</option>
        )
    })

    return output
}

export const renderLocation = ({locations, text}) => {
    
    const output:React.JSX.Element[] = [
        <option key={9999*100} value={text.toLocaleLowerCase()} disabled>{text}</option>
    ]

    locations && locations.forEach((location: ILocationParams, index: number) => {
        output.push(
            <option key={index} value={location.id}>{location.name}</option>
        )
    })

    return output
}

export const renderStatus = ({text}) => {
    
    const output:React.JSX.Element[] = [
        <option key={9999*100} value={text.toLocaleLowerCase()} disabled>{text}</option>
    ]

    STATUS && STATUS.forEach((status) => {
        output.push(
            <option key={status.value} value={status.value}>{status.value}</option>
        )
    })

    return output
}

export function isObjectEmpty(obj: any): boolean {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

export function buildQueryString(obj:object): string {
    const queryString = Object.entries(obj)
        .filter(([key, value]) => value && !(key === 'status' && value === 'status'))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) 
        .join('&'); 

    return queryString ? `?${queryString}` : ''; 
}

export const formatNumberVN = (num:bigint | number) => {
    return num.toLocaleString('vi-VN') || "";
}

export const formatDate = (date:string) => {
    const dateObject = new Date(date);

    // Mảng các tháng
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = dateObject.getUTCDate();
    const month = months[dateObject.getUTCMonth()];
    const year = dateObject.getUTCFullYear();

    // Tạo đầu ra dưới dạng "dd MMM yyyy"
    const outputDate = `${day} ${month} ${year}`;

    return outputDate || ""
}


export function removeElementById(arr:IProduct[], id: number) {

    const findProduct = arr.find(item => item.id === id)
    const products = arr.filter(item => item.id !== id)
    
    if(findProduct){
        return {
            item:findProduct,
            products
        }
    }

    return {
        item:{},
        products
    };
}

export function formatString(str: string): string {
    // Kiểm tra xem chuỗi có rỗng không
    if (!str) return str;

    // Chuyển đổi ký tự đầu tiên thành viết hoa và các ký tự còn lại thành viết thường
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const filterArrays = (arr01:IProduct[], arr02:IProduct[]) => {
    const output01:IProduct[] = []
    const output02:IProduct[] = []

    if(arr02.length === 0){
        return {
            products:arr01,
            drafts:[]
        }
    }else{
        arr01.forEach(item => {
            arr02.forEach(item02 => {
                if(item02.id === item.id){
                    output02.push(item)
                }else{
                    output01.push(item)
                }
            })
        })
        
        return {
            products:output01,
            drafts:output02
        }
    }
}

export function paginateData(data, currentPage: number, pageSize:number = 6) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}

export function filterArrayByObjectValues(arr:IProduct[], obj:ISearchParams){
    
    // Lọc các phần tử của mảng mà có giá trị tương ứng với các giá trị của object
    return arr.filter(item =>
        Object.entries(obj).every(([key, value]) =>
            item[key] && item[key].toString().toLowerCase().includes(value.toString().toLowerCase())
        )
    );
}

export function removeFalsyValues(obj){
    const newObj = {};

    for (const key in obj) {
        if(!(key === "status" && obj[key] === "STATUS") && obj[key]){
            newObj[key] = obj[key];
        }
    }

    return newObj;
}

export function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

export function removePageQueryParam(queryString) {
    // Tách chuỗi query thành một đối tượng URLSearchParams
    const params = new URLSearchParams(queryString);
  
    // Kiểm tra xem tham số 'page' có tồn tại không
    if (params.has('page')) {
      // Nếu có, loại bỏ tham số 'page'
      params.delete('page');
    }
  
    // Trả về chuỗi query mới kèm dấu '?'
    return params.toString() ? '?' + params.toString() : '';
  }
  
export function queryStringToObject(queryString) {
    // Tạo một đối tượng trống để lưu trữ các tham số
    const params = {};

    if(!queryString) return params
    
    // Kiểm tra xem chuỗi có dấu '?' không
    const startIndex = queryString.indexOf('?');
    if (startIndex !== -1) {
      // Loại bỏ dấu '?' nếu có
      queryString = queryString.slice(startIndex + 1);
    }
  
    // Tách các cặp key-value bằng dấu '&'
    const pairs = queryString.split('&');
  
    // Duyệt qua mỗi cặp key-value
    pairs.forEach(pair => {
      // Tách key và value bằng dấu '='
      const [key, value] = pair.split('=');
      // Thêm vào object params
      params[key] = decodeURIComponent(value || '');
    });
  
    return params;
}

export function base64StringToFile(base64String, filename, mimeType) {
    // Tạo một mảng nhị phân từ chuỗi base64
    const byteCharacters = atob(base64String.split(',')[1]);
  
    // Đặt kiểu dữ liệu cho mảng nhị phân
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    // Tạo một đối tượng ArrayBuffer từ mảng số nguyên
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
  
    // Tạo một đối tượng File từ Blob và trả về
    return new File([blob], filename, { type: mimeType });
  }