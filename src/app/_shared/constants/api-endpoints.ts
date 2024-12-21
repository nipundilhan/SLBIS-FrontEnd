const AUTH_BASE = '/auth';
const TOUR_BASE = '/tours';
const USER_BASE = '/user';
const TUTE_BASE = '/tutorial';
const INQUIRY_BASE = '/inquiry';

export const API_ENDPOINTS = {
  AUTH: {
    BASE: AUTH_BASE,
    AUTHENTICATE: `${AUTH_BASE}/authenticate`,
    REGISTER: `${AUTH_BASE}/register`,
  },
  TOURS: {
    BASE: TOUR_BASE,
    GET_ALL: `${TOUR_BASE}/all`,
    CREATE: `${TOUR_BASE}/create`,
    GET_ONE: (id: string) => `${TOUR_BASE}${id}`, // Path variable example
  },  
  TUTORIALS: {
    BASE: TUTE_BASE,
    GET_BY_STUDENT_ID: `${TUTE_BASE}/findByStudent/`,
    CREATE: `${TOUR_BASE}/create`,
    GET_ONE: (id: string) => `${TOUR_BASE}${id}`, // Path variable example
  },
  INQUIRY: {
    BASE: INQUIRY_BASE,
    GET_BY_ID: `${INQUIRY_BASE}/findByInquiryId/`,
    GET_BY_EMAIL: `${INQUIRY_BASE}/findByEmail/`,
    ADD_COMMENT: `${INQUIRY_BASE}/addComment`,
    ADD_MESSAGE: `${INQUIRY_BASE}/addMessage`,
    CHANGE_STATUS: `${INQUIRY_BASE}/changeStatus`,
    PRODUCTS: `${INQUIRY_BASE}/getProducts`,
    GET_ONE: (id: string) => `${INQUIRY_BASE}${id}`, // Path variable example
  },
  USERS: {
    BASE: USER_BASE,
    SIGNUP: `${USER_BASE}/signup`,   
    SEARCH: (params: { [key: string]: any }) => {
      const queryParams = new URLSearchParams(params).toString();
      return `${USER_BASE}/search?${queryParams}`; // Param map example
    }
  },
  

  /* 
  usage 

    getTourById(id: string) {
        return this.http.get(API_ENDPOINTS.TOURS.GET_ONE(id));
    }

    searchUsers(params: { [key: string]: any }) {
        return this.http.get(API_ENDPOINTS.USERS.SEARCH(params));
    }


  */
};