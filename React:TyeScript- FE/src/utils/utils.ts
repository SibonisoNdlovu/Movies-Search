// @ts-nocheck
import { createSearchParams } from "react-router-dom";
import { IAppParams } from "../services/interfaces";

export function stringifyParams(params: Partial<IAppParams>) {
  params = removeNullOrUndefined(sortParams(params));
  return createSearchParams(params).toString();
}

export function toParamsObj(searchParams: URLSearchParams) {
  let params = { search: searchParams.get('search'), genre: searchParams.get('genre')};
  params = removeNullOrUndefined(params);
  return params as Partial<IAppParams> | IAppParams;
}

export function sortParams(p: Partial<IAppParams>) {
  const params = { search: p.search, genre: p.genre };
  return params as IAppParams;
}

export function getQuery( search =undefined, genre= undefined) {
  let odataQ: OdataQuery = {  };
  if(search || genre) {
    odataQ.$filter = filter(search, genre);
  }
  return odataQ;
};

export function filter (search?:string, genre?: string) {
  let filterString = '';
  if(search) {
    filterString+=`contains(tolower(title),tolower('${search}'))`;
  }
  if(genre) {
    filterString+= filterString.length > 0 ? 'and ': '';
    filterString+= `genres/any(g: g/name eq '${genre}')`;
  }
  return filterString;
};

function removeNullOrUndefined(obj) {
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === "undefined" || typeof obj[key] === "object") {
      delete obj[key];
    }
  });
  return obj;
};

export function uuid() {
  return 'xxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3);
      return v.toString(4);
  });
};
  
