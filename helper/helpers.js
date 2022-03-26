exports.paginate = (page, page_size = 10, type = '') => {

    page = page ? parseInt(page) : 0;

    if (page >= 1) {
        page = page - 1;
    }

    const offset = page * page_size
    const limit = page_size
    if (type != '' && type == 'export')
        return {}
    else
        return { offset, limit }
}
