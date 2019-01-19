const escape = require('mysql').escape;

exports.select_isbn = (model) => {
    return `
        select isbn
        from book 
        where book_name = ${escape(model.title)}`
}

exports.insert_userbook = (model) => {
    return `
        insert into user_book(
            user_id, isbn, had_read, be_interested
        ) values(
            ${escape(model.user_id)}
            ,${escape(model.isbn)}
            ,${escape(model.flag_r)}
            ,${escape(model.flag_i)}
        )`
}

exports.select2 = (model) => {
    return `
        update user_book set had_read, where
        select * from book where isbn = ${escape(model.isbn)}`
}

exports.transaction = (model) => {
    return `
        insert into sample(
            id,col1,col2
        ) values(
            ${escape(model.id)}
            ,${escape(model.col1)}
            ,${escape(model.col2)}
        )`
}

exports.select3 = (model) => {
    return `
        select * from sample_rel where sample_id = ${escape(model.sample_id)}`
}
