select f.fnumb, f.price, fl.floornum, o.name from flats f
    join floors fl on fl.id=f.floorid
    join objects o on f.objectid=o.id
    where o.id = 5;


select f.fnumb, p.id, t.name, p.square from flats f 
    join partsquares p on f.id=p.fid
    join parttypes t on p.parttypeid=t.id
    order by fnumb, t.code1c;


select f.objectid, f.fnumb, c.regnum
    from flats f 
    left join contracts c on c.flatid = f.id
    order by f.objectid, fnumb;    

select f.objectid, f.fnumb, p.id, sum(p.square) from flats f 
    join partsquares p on f.id=p.fid
    group by fnumb
    order by f.objectid, cast(fnumb as unsigned);


