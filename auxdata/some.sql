select f.fnumb, f.price, fl.floornum, o.name from flats f
    join floors fl on fl.id=f.floorid
    join objects o on f.objectid=o.id
    where o.id = 5
