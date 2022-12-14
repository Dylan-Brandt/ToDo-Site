--mysql -u C4131F22U14 -hcse-mysql-classes-01.cse.umn.edu -P3306 -p C4131F22U14

create table tasks (
    taskId integer not null auto_increment primary key,
    taskTitle varchar(50) not null,
    taskPriority varchar(50) not null,
    taskStatus varchar(50) not null
);