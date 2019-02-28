import pymysql
import io
import json


def opendb():
    print ('open')
    conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='Csd321', \
        db='db_sddpavmyls',  cursorclass=pymysql.cursors.DictCursor)
    return conn


# ..............................................................................

def floorinsert(conn, fn, oid):
    id = -1
    print(fn)
    try:
        sql = 'select id, objectid from floors where floornum=%s and objectid=%s'
        curs = conn.cursor()
        curs.execute(sql, (fn, oid))
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

def flatinsert(conn, objid, floorid, flat):
    id = -1
    sql = 'select id from flats  where objectid=%s and floorid=%s and fnumb=%s'
#    try:
    if True:
        fnumb = flat['fnumb']
        curs = conn.cursor()
        curs.execute(sql, (objid, floorid, fnumb))
        row = curs.fetchone()
        if curs.rowcount < 1:

            sql = """insert into flats 
                (objectid, floorid, code, fnumb, nrooms, square, gensquare, price, sold) 
                values 
                (%s ,%s, %s, %s, %s, %s, %s, %s, %s)"""
            code = flat['code']
            nrooms = flat['nrooms']
            square = flat['square']            
            gensquare = flat['gensquare']
            price = flat['price']
            sold = flat['sold']
            # insert
            curs = conn.cursor()
            curs.execute(sql, (objid, floorid, code, fnumb, nrooms, square, gensquare, price, sold))

            id = curs.lastrowid
        else:
            id = row['id']

        curs.close()
        conn.commit()

        squaresinsert(conn, id, flat['squares'])
        contractinsert(conn, id, flat['contract'])
 #   except Exception:
 #       print('ex')
 #      id = -2
    return id

# ..............................................................................

def squaresinsert(conn, flatid, squares):
    sql = 'select id from partsquares where fid = %s and parttypeid=%s'
    sql2 = 'insert into partsquares (parttypeid, fid, square) values (%s, %s, %s)'
    sql3 = 'select  id, name, code1c from parttypes where code1c=%s'
    for sq in squares:
        code1c = sq['code']
        square = sq['square']


        curs = conn.cursor()
        curs.execute(sql3, (code1c))
        row = curs.fetchone()
        if curs.rowcount > 0:
             parttypeid = row['id']
             curs.close()

             curs = conn.cursor();
             curs.execute(sql, (flatid, parttypeid))
             row = curs.fetchone()

             if curs.rowcount < 1:
                curs.close()
                curs = conn.cursor()
                curs.execute(sql2, (parttypeid, flatid, square))
             else:
                pass

        else:
            pass
        curs.close()
        conn.commit()    

# ..............................................................................

def contractinsert(conn, flatid, contract):
    # ins conttact

    sql1 = 'select id from contracts where flatid =%s'
    sql2 = 'insert into contracts (flatid, regnum) values (%s, %s)'

    contractid = -1

    if contract:
        curs = conn.cursor()
        curs.execute(sql1, (flatid))
        row = curs.fetchone()
        if curs.rowcount > 0:
             contractid= row['id']
             curs.close()
        else:
            regnum = contract['regnum']
            curs.close()
            curs = conn.cursor()
            curs.execute(sql2, (flatid, regnum))
            contractid = curs.lastrowid

        paysheduleinsert(conn, contractid, contract['payshedule'])


# .............................................................................,

def paysheduleinsert(conn, contractid, shedule):
    for payment in shedule:
        pdate = payment['date']
        print(pdate)


# clear partsquares flats floors # (objects)

def insertall(f1, objectid, conn):
    with io.open(f1, 'r', encoding='utf-8-sig') as f:  
        data = json.load(f)
        for floor in data:
            floornum = floor['floornum']
            floorid = floorinsert(conn, int(floornum), objectid)
            for flat in floor['flats']:
                flatinsert(conn, objectid, floorid, flat)



if __name__ == "__main__":
    conn = opendb()

    f1 = '../TMP/paris.json'
    objectid = 10
    insertall(f1, objectid, conn)

    f1 = '../TMP/chickago.json'
    objectid = 5
    insertall(f1, objectid, conn)

    f1 = '../TMP/chickago-st.json'
    objectid = 6
    insertall(f1, objectid, conn)


    f1 = '../TMP/tokio.json'
    objectid = 7
    insertall(f1, objectid, conn)

    f1 = '../TMP/tokio-st.json'
    objectid = 9
    insertall(f1, objectid, conn)

    f1 = '../TMP/tokio-pr.json'
    objectid = 11
    insertall(f1, objectid, conn)


# tokio-pr
