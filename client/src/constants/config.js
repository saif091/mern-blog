export const API_NOTIFICATION_MESSAGES ={
    loading :{
        title:"Loading...",
        message:"Data is being loaded, Please Wait"
    },
    success:{
        title:"Success",
        message:"Data successfully loaded"
    },
    responseFailure:{
        title:"Error",
        message:"An error occured while fetching response from the server. Please try again" 
    },
    requestFailure :{
        title:"Error",
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:"Error",
        message:"Unable to connect with the server , Please check internet connectivity"
    }

}



export const SERVICE_URLS = {
    userSignup: {url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost: { url: 'create', method: 'POST' },

}