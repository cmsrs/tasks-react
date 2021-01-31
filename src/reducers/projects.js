import { PROJECTS_GET_PRODUCTS, PROJECTS_SAVE_PRODUCT, PROJECTS_CHANGE_PRODUCT, PROJECTS_DELETE_PRODUCT, PROJECTS_RES } from '../actions/types';

const INITIAL_STATE = {
  projects: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROJECTS_RES:
      return { ...state, projects_res: action.payload };
    case PROJECTS_GET_PRODUCTS:
      const projects1 = { ...state, projects: action.payload, projects_res:{} };
      return projects1;
    // case PRODUCTS_GET_PAGES:
    //   const products2 = { ...state, shop_pages: action.payload, products_res:{} };
    //   return products2;
    // case PRODUCTS_SAVE_PRODUCT: //not used
    //   const product = { name: '', sku: '', price: 0, description: '', page_id: '', images: []  }; //clear input
    //   const retP = { ...state, product: product, products_res:{}};
    //   return retP;
    // case PRODUCTS_CHANGE_PRODUCT:
    //   //console.log(action.payload);
    //   return { ...state, product: action.payload, products_res:{} };
    //
    // case PRODUCTS_SET_PRODUCT:
    //   return { ...state, product: action.payload, products_res:{} };
    //
    // case PRODUCTS_DELETE_PRODUCT:
    //   let productsCopy2 = state.products.slice();
    //   let productsDel = [];
    //   for(let itemp of productsCopy2){
    //     if(itemp.id !== action.payload){
    //       productsDel.push(itemp);
    //     }
    //   }
    //   return { ...state, products: productsDel, products_res:{} };

    default:
      return state;
  }
}
