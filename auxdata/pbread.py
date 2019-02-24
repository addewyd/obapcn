
import csv
import pymysql
import traceback

def opendb():
    print ('open')
    conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='Csd321', \
        db='db_sddpavmyls',  cursorclass=pymysql.cursors.DictCursor)
    return conn

def objinsert(conn, c, j):
    id = -1
    try:
        sql = 'select id, code1c from objects where code1c=%s'
        curs = conn.cursor()
        curs.execute(sql, (c))
        row = curs.fetchone()
        print("rco %d " % (curs.rowcount))

        if curs.rowcount < 1:
            sql = 'insert into objects (name, code1c) values (%s, %s)'
            curs = conn.cursor()
            curs.execute(sql, (j, c))
            id = curs.lastrowid
        else:
#            row = cursor.fetchone()
            id = row['id']
        curs.close()
        conn.commit()
        
        print("cji %s %s %d" % (c,j,id))
    except:
        print("cj %s %s" % (c,j))
        id = -3
    return id

# ..............................................................................

def floorinsert(conn, fn, oid):
    id = -1
    print("F oid %d fn %d" % (oid, fn))
    try:
        sql = 'select id, objectid from floors where floornum=%s'
        curs = conn.cursor()
        curs.execute(sql, (fn))
        row = curs.fetchone()
        print("rcf %d " % (curs.rowcount))
        if curs.rowcount < 1:
            print("S oid %d fn %d" % (oid, fn))
            sql = 'insert into floors (objectid, floornum) values (%s, %s)'
            curs = conn.cursor()
            curs.execute(sql, (oid, fn))
            id = curs.lastrowid
        else:
            id = row['id']
        curs.close()
        conn.commit()
    except Exception:
        #print(traceback.format_exception())
        id = -2
    return id


# ..............................................................................

def flatinsert(conn, objid, floorid, line):
    sql = 'insert into flats (objectid, floorid, fnumb, nrooms, contractid, square, gensquare, price) values (%s ,%s, %s, %s, %s, %s, %s, %s)'

    fnumb = line['Номер']
    nrooms = line['Кол-во комнат'] . replace(',', '.')
    contractid = 0
    square = line['Жилая площадь, м2'] . replace(',', '.')
    gensquare = line['Общая площадь, м2'] . replace(',', '.')
    price = line['Полная стоимость, руб'] . replace(',', '.')
    
    print ("n %s r %s s %s g %s p %s" % (fnumb, nrooms, square, gensquare, price))
    
    if nrooms == '': nrooms = 0
    if square == '': square = 0
    if gensquare == '': gensquare = 0
    if price == '': price = 0
    
    curs = conn.cursor()
    curs.execute(sql, (objid, floorid, fnumb, nrooms, contractid, square, gensquare, price))
    conn.commit()
    
def getobjid(conn, o1c):
    return 0

def getfloorid(ofloor, opbjid):
    return 0

def csv_reader(file_obj, conn):

    obj_code1c = ''
    objid = -1
    floor_num = None

    reader = csv.DictReader(file_obj, delimiter=';')
    for line in reader:
        if line["Номер"][0] == '-': continue
        if len(line["Номер"]) > 7:
            obj_code1c = line["Номер"]
            jk = line["ЖК"]
            objid = objinsert(conn, obj_code1c, jk)
            print("obj id %d " % (objid))
        else:
            # objid = getobjid(conn, obj_code1c)
            if objid > 0:
                ofloor  = line["Этаж"]
                if ofloor == '':
                    print("florr empty in %s" % (line["Номер"]))
                else:
                    print("floor %d" % (int(ofloor)))
                    floorid = floorinsert(conn, int(ofloor), objid)
                    print("got floor id %d" % (floorid))
                    if floorid > 0:
                        print(line["Номер"], end=",")
                        print(line["Номер на площадке"], end=",")
                        print(line["Этаж"], end=",")
                        print(line["Общая площадь, м2"], end="")
                        
                        flatinsert(conn, objid, floorid, line)
                        

            print('')

if __name__ == "__main__":
    csv_path = "Pb0.csv"
    with open(csv_path, "r", encoding='utf-8') as f_obj:
        conn = opendb()
        csv_reader(f_obj, conn)

