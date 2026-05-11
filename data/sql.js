window.registerSnippets("SQL", [
  { title: "Recent customer orders", code: `select
  c.customer_id,
  c.email,
  count(o.order_id) as order_count
from customers c
join orders o on o.customer_id = c.customer_id
group by c.customer_id, c.email;` },
  { category: "algorithms", title: "Nth highest salary", code: `select distinct salary
from employees e1
where 2 = (
  select count(distinct salary)
  from employees e2
  where e2.salary >= e1.salary
);` }
]);

window.expandSnippets("SQL", [
  (n) => ({ title: `Window rank ${n}`, code: `select
  employee_id,
  department_id,
  salary,
  dense_rank() over (
    partition by department_id
    order by salary desc
  ) as salary_rank
from employees;` }),
  (n) => ({ title: `Consecutive records ${n}`, code: `select user_id, login_date
from (
  select
    user_id,
    login_date,
    login_date - row_number() over (
      partition by user_id order by login_date
    )::int as streak_group
  from logins
) grouped;` }),
  (n) => ({ title: `Duplicate email ${n}`, code: `select email
from users
group by lower(email)
having count(*) > 1;` })
]);
