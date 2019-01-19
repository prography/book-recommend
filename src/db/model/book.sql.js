import mysql from 'mysql'
const escape = mysql.escape;

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

exports.update_flag = (model) => {
    return `
        update user_book 
        set had_read = ${escape(model.flag_r)}, is_interested = ${escape(model.flag_i)}
        where user_id = ${escape(model.user_id)} and isbn = ${escape(model.isbn)}`
}

exports.insert_usertag = (model) => {
    return `
        insert into user_tag(
            user_id, tags
        ) values(
            ${escape(model.user_id)}
            ,${escape(model.tags)}
        )`
}