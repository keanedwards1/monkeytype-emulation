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

window.registerSnippets("SQL", [
  { title: "Invoice aging report", code: `select
  account_id,
  sum(amount_cents) filter (where due_at < current_date) as overdue_cents,
  max(due_at) as latest_due_at
from invoices
where status in ('open', 'past_due')
group by account_id
order by overdue_cents desc;` },
  { title: "Upsert user settings", code: `insert into user_settings (user_id, theme, email_digest)
values (:user_id, :theme, :email_digest)
on conflict (user_id) do update set
  theme = excluded.theme,
  email_digest = excluded.email_digest,
  updated_at = now();` },
  { title: "Feature flag rollout", code: `select u.id, u.email
from users u
join workspaces w on w.id = u.workspace_id
left join feature_overrides fo
  on fo.user_id = u.id and fo.flag_key = 'new_editor'
where w.plan in ('team', 'enterprise')
  and coalesce(fo.enabled, true) = true;` }
]);

window.registerSnippets("SQL", [
  { title: "Active subscriptions", code: `select account_id, plan, renews_at
from subscriptions
where status = 'active'
  and renews_at > now()
order by renews_at;` },
  { title: "Monthly revenue", code: `select date_trunc('month', paid_at) as month,
  sum(amount_cents) as revenue_cents
from invoices
where status = 'paid'
group by 1
order by 1;` },
  { title: "User retention", code: `select cohort_month, activity_month, count(distinct user_id) as users
from user_activity_cohorts
group by cohort_month, activity_month
order by cohort_month, activity_month;` },
  { title: "Latest order per customer", code: `select *
from (
  select o.*, row_number() over (partition by customer_id order by created_at desc) as rn
  from orders o
) ranked
where rn = 1;` },
  { title: "Search documents", code: `select id, title
from documents
where search_vector @@ plainto_tsquery(:query)
order by ts_rank(search_vector, plainto_tsquery(:query)) desc;` },
  { title: "Soft delete", code: `update projects
set deleted_at = now(),
    updated_at = now()
where id = :project_id
  and deleted_at is null;` },
  { title: "Backfill slugs", code: `update articles
set slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
where slug is null;` },
  { title: "Lock pending jobs", code: `select id, payload
from jobs
where status = 'pending'
order by priority desc, created_at
for update skip locked
limit 50;` },
  { title: "Mark job running", code: `update jobs
set status = 'running',
    started_at = now(),
    attempts = attempts + 1
where id = :job_id;` },
  { title: "Recursive categories", code: `with recursive tree as (
  select id, parent_id, name from categories where id = :root_id
  union all
  select c.id, c.parent_id, c.name from categories c join tree t on c.parent_id = t.id
)
select * from tree;` },
  { title: "Rolling seven day", code: `select day,
  sum(signups) over (order by day rows between 6 preceding and current row) as signups_7d
from daily_metrics
order by day;` },
  { title: "Find gaps", code: `select expected.id
from generate_series(1, 1000) as expected(id)
left join imported_rows r on r.sequence_id = expected.id
where r.sequence_id is null;` },
  { title: "JSON property filter", code: `select id, payload
from events
where payload->>'type' = 'account.updated'
  and payload->'changes' ? 'plan';` },
  { title: "Array aggregation", code: `select account_id,
  array_agg(email order by created_at) as member_emails
from users
group by account_id;` },
  { title: "Distinct on latest", code: `select distinct on (device_id)
  device_id, status, reported_at
from device_statuses
order by device_id, reported_at desc;` },
  { title: "Case expression", code: `select id,
  case
    when paid_at is not null then 'paid'
    when due_at < now() then 'overdue'
    else 'open'
  end as invoice_state
from invoices;` },
  { title: "Insert audit", code: `insert into audit_events (actor_id, action, target_id, created_at)
values (:actor_id, :action, :target_id, now())
returning id;` },
  { title: "Update from join", code: `update users u
set workspace_name = w.name
from workspaces w
where w.id = u.workspace_id
  and u.workspace_name is distinct from w.name;` },
  { title: "Delete orphan rows", code: `delete from invite_tokens t
where not exists (
  select 1 from invitations i where i.token_id = t.id
);` },
  { title: "Plan usage summary", code: `select w.plan,
  count(distinct w.id) as workspaces,
  count(u.id) as users
from workspaces w
left join users u on u.workspace_id = w.id
group by w.plan;` },
  { title: "Percentile latency", code: `select endpoint,
  percentile_cont(0.95) within group (order by duration_ms) as p95_ms
from request_logs
where created_at >= now() - interval '1 day'
group by endpoint;` },
  { title: "Failed login count", code: `select user_id, count(*) as failed_attempts
from login_attempts
where success = false
  and created_at >= now() - interval '15 minutes'
group by user_id
having count(*) >= 5;` },
  { title: "Materialized refresh", code: `refresh materialized view concurrently account_usage_summary;` },
  { title: "Constraint add", code: `alter table users
add constraint users_email_not_blank
check (length(trim(email)) > 0);` },
  { title: "Index concurrently", code: `create index concurrently if not exists
idx_events_account_created
on events (account_id, created_at desc);` },
  { title: "Unique lower email", code: `create unique index concurrently users_lower_email_key
on users (lower(email))
where deleted_at is null;` },
  { title: "Session cleanup", code: `delete from sessions
where expires_at < now()
   or revoked_at is not null;` },
  { title: "Permission join", code: `select p.*
from permissions p
join role_permissions rp on rp.permission_id = p.id
join user_roles ur on ur.role_id = rp.role_id
where ur.user_id = :user_id;` },
  { title: "Unread notifications", code: `select count(*) as unread_count
from notifications
where user_id = :user_id
  and read_at is null;` },
  { title: "Account search", code: `select id, name, domain
from accounts
where name ilike '%' || :query || '%'
   or domain ilike '%' || :query || '%'
order by name
limit 20;` },
  { title: "Trial ending soon", code: `select id, email, trial_ends_at
from accounts
where plan = 'trial'
  and trial_ends_at between now() and now() + interval '3 days';` },
  { title: "Event dedupe", code: `select event_key, min(id) as keep_id, count(*) as copies
from inbound_events
group by event_key
having count(*) > 1;` }
]);
