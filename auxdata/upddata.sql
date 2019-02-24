
-- pgentypes
insert into pgentypes (id, name) values (
1, "Жилое"
);
insert into pgentypes (id, name) values (
2, "Нежилое"
);
insert into pgentypes (id, name) values (
3, "Вспомогательное"
);
insert into pgentypes (id, name) values (
4, "ЛоджияБалконВерендаТерраса"
);

-- parttypes

-- name, pgentypeid, code1c, forlife

insert into parttypes (name, pgentypeid,code1c,forlife) values (
'нежилое помещение', 2, 1, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'коридор', 3, 2, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'кухня-гостиная', 1, 3, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'комната 1', 1, 4, 1
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'комната 2', 1, 5, 1
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'лоджия', 4, 6, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'лоджия', 3, 7, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'с/у', 3, 8, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'кухня', 3, 9, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'комната 3', 1, 10, 1
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'гардеробная 1', 3, 11, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'тамбур', 2, 12, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'кладовая', 2, 13, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'гардеробная 2', 3, 14, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'балкон', 4, 15, 0
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'комната 4', 1, 16, 1
);
insert into parttypes (name, pgentypeid,code1c,forlife) values (
'тех.комната', 3, 17, 0
);
