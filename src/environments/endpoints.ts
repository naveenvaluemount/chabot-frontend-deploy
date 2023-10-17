export const endpoints =  {

    users:{
        create:'user/createorUpdate',
        delete:'user/delete/',
        read:'user/getAll',
        menu:'user/menu',
        login:'user/login',
        register:'user/register',
        logout:'user/logout',
        changepassword:'user/password/change',
        refreshToken:'user/refreshToken'
    },
    organization:{
        create:'org/createorUpdate',
        delete:'org/deleteById/',
        read:'org/allOrg',
        single:'org/getById/',
        validator:'org/validator/',

    },
    categories:{
        create:'category/createorUpdate',
        delete:'category/delete/CategoryById/',
        read:'category/getAll'
    },
    themes:{
        create:'themes/createorUpdate',
        delete:'themes/delete/ThemeById/',
        read:'themes/getAllThemes'
    },
    whitelist:{
        create:'ipAddress/createorUpdate',
        delete:'ipAddress/deleteById/',
        read:'ipAddress/getAll'
    },
    faqs:{
        create: 'faqs/createorUpdate',
        read: 'faqs/getAllFaqs',
        delete: 'faqs/delete/FaqsById/',
        single: 'faqs/getById/',
    },
    templates:{
        read: 'whatsapp/template/list',
    },
    maintainance:{
        deployementDate: 'deployment/deploymentDate'
    },
    chatbot: {
        retrive: 'faqs/answer',
        category: 'category/getChild'
    },
    publish: {
        publishOrg: 'publish/publishById/'
    }
}
