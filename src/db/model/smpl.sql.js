const escape              = require('mysql').escape;

exports.select = (model) => {
  return `
    select *
    from book 
    where ${escape(model.where)}
    and column = ${escape(model.column)}
    ${cond1(model)}`
}

exports.select2 = (model) => {
  return `
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
