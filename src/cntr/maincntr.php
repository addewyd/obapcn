<?php
namespace Obapcn;


mb_internal_encoding("UTF-8");

require __DIR__ . '/../../vendor/autoload.php';
require_once './defines.php';
require_once './crdb.php';

require_once 'auxbase.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;


// create a log channel
$log = new Logger('obapcn');
$log->pushHandler(new StreamHandler(LOG_DIR, Logger::DEBUG));
$log -> debug('start', [HTTP_HOST]);

class Maincntr extends AuxBase {
    public function returnResult ($answer) {

        ob_start();
        ob_end_clean();
        Header('Cache-Control: no-cache');
        Header('Pragma: no-cache');
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($answer);
    }

    // .........................................................................

    protected function upddb($dbname) {
        $this -> log -> debug('upddb', [$dbname]);
        try {
            $sql = file_get_contents('../scripts/obapcn.sql');
            $this -> log -> debug('upddb', [$sql]);
            $this -> pdo ->exec($sql);
            return ['success', 'ok', ''];
        }
        catch(\Exception $e) {
            $this -> log -> debug('upddb', [$e]);
            return ['error', $e, ''];
        }
    }

    // .........................................................................

    public function manage($operation, $params)
    {
        $status = '';
        $res = '';
        $cmt = '';
        $this -> log -> debug('operation', [$operation]);
        switch($operation) {
            case 'upddb':
                $r = $this -> upddb($params['dbname']);
                $status = $r[0];
                $res = $r[1];
                $cmt = $r[2];
                break;

            case 'getObjects':
                $sql = 'select id, name from objects';
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute();
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'getData':
                $objectid = $this -> params['objectid'];
                $sql = 'select * from floors where objectid=?';
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'getParts':
                $flatid = $this -> params['flatid'];
                $sql = 'select * from parttypes order by code1c';
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute();
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'saveNewObject':
                $sql = 'insert into objects (name, code1c) values (?,?)';
                $objectname = $this -> params['objectname'];
                $c1c = $this -> params['c1c'];
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectname, $c1c]);
                    $status = 'success';
                    $res = ['id'=>$this -> pdo -> lastInsertId(), 'name'=>$objectname];
//$this -> log -> debug('SNO res', $res);
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }
                break;

            case 'saveNewFloor':
                $objectid = $this -> params['objectid'];
                $f_num = $this -> params['f_num'];
                $flat_numb = $this -> params['flat_numb'];
                try {
                    $this -> pdo->beginTransaction();

                    $sql = 'insert into floors (objectid, floornum) values (?,?)';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid, $f_num]);
//$this -> log -> debug('snf 1', []);
                    $lid = $this -> pdo-> lastInsertId();
//$this -> log -> debug('snf 2', [$lid]);

                    $sql = 'insert into flats (objectid, floorid, sold, studio, cottage,'
                            . ' nosell, pledge, flattype, bph, code)'
                            . ' values (?,?,?,?,?,?,?,?,?, ?)';
                    for($i = 0; $i < $flat_numb; $i ++) {
                        $j = $i + 1;
                        $code = $f_num . '_' . $j;
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$objectid, $lid, 0, 0, 0, 0, 0, 0, 0, $code]);
//$this -> log -> debug('snf 3', [$code]);

                    }

                    $this -> pdo->commit();
                    $status = 'success';
                } catch(\PDOException $e) {
                    $this -> pdo -> rollback();
                    $status = 'error';
                    $res = $e;
                }
                break;

            case 'delEmptyFloors':
                $objectid = $this -> params['objectid'];
                try {
                    $this -> pdo->beginTransaction();
                    $sql = 'select id from floors where objectid=?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    foreach($res as $rec) {
                        $flid = $rec['id'];
                        $sql = 'select * from flats where floorid = ?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$flid]);
                        $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                        if (count($res) < 1) {
                            $sql = 'delete from floors where id=?';
                            $q = $this -> pdo->prepare($sql);
                            $q->execute([$flid]);
                        }
                    }
                    $this -> pdo->commit();
                    $status = 'success';

                } catch(\PDOException $e) {
                    $this -> pdo -> rollback();
                    $status = 'error';
                    $res = $e;
                }
                break;

            case 'delObject':
                $objectid = $this -> params['objectid'];
                try {
                    $this -> pdo->beginTransaction();
                    // DEL FLATS, FLOORS, CONTRACTS, PARTSQUARES, PAYSHEDULES

                    $sql = 'select * from flats where objectid = ?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    foreach($res as $rec) {
                        $fid = $rec['id'];
                        $sql = 'delete from partsquares where fid=?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$fid]);

                        $sql = 'select * from contracts where flatid = ?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$fid]);
                        $res2 = $q->fetchAll(\PDO::FETCH_ASSOC);
                        foreach($res2 as $rec2) {
                            $sql = 'delete from payshedules where contractid=?';
                            $q = $this -> pdo->prepare($sql);
                            $q->execute([$rec2['contractid']]);
                        }

                        $sql = 'delete from contracts where flatid=?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$fid]);

                    }
                    $sql = 'delete from flats where objectid=?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid]);

                    $sql = 'delete from floors where objectid=?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid]);

                    $sql = 'delete from objects where id=?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$objectid]);

                    $this -> pdo->commit();
                    $status = 'success';

                } catch(\PDOException $e) {
                    $this -> pdo -> rollback();
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'delFloor':
                $floorid = $this -> params['floorid'];
                try {
                    $this -> pdo->beginTransaction();
                    // DEL FLATS, FLOORS, CONTRACTS, PARTSQUARES, PAYSHEDULES

                    $sql = 'select * from flats where floorid = ?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$floorid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    foreach($res as $rec) {
                        $fid = $rec['id'];
                        $sql = 'delete from partsquares where fid=?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$fid]);

                        $sql = 'select * from contracts where flatid = ?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$fid]);
                        $res2 = $q->fetchAll(\PDO::FETCH_ASSOC);
                        foreach($res2 as $rec2) {
                            $sql = 'delete from payshedules where contractid=?';
                            $q = $this -> pdo->prepare($sql);
                            $q->execute([$rec2['contractid']]);
                        }

                        $sql = 'delete from contracts where flatid=?';
                        $q = $this -> pdo->prepare($sql);
                        $q->execute([$fid]);

                    }
                    $sql = 'delete from flats where floorid=?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$floorid]);

                    $sql = 'delete from floors where id=?';
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$floorid]);

                    $this -> pdo->commit();
                    $status = 'success';

                } catch(\PDOException $e) {
                    $this -> pdo -> rollback();
                    $status = 'error';
                    $res = $e;
                }

                break;

                // one row (floor) in object
            case 'getFloorData':
                $floorid = $this -> params['floorid'];
                $sql = 'select f.id, fl.floornum, f.fnumb, f.square, '
                        . 'f.price, f.nrooms, f.gensquare, f.sold, f.floorid, '
                        . 'fl.plot as floorplot, f.deal_id, f.code '
                        . ' from flats f join floors fl '
                        . ' on f.floorid=fl.id'
                        . ' where floorid=?';
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$floorid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'getSquares':
                $flatid = $this -> params['flatid'];
                $sql = 'select t.code1c, t.name, p.square, p.parttypeid, t.forlife from partsquares p '
                        . 'join parttypes t on p.parttypeid=t.id '
                        . 'where p.fid = ? order by t.code1c ';
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$flatid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'getOrderData':
                $flatid = $this -> params['flatid'];
                $sql = 'select * from contracts where flatid=?'
                        ;
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$flatid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            case 'getPshedData':
                //$this -> log -> debug('psd', $this -> params);
                $orderid = $this -> params['orderid'];
                $sql = 'select * from payshedules where contractid=?'
                        ;
                try {
                    $q = $this -> pdo->prepare($sql);
                    $q->execute([$orderid]);
                    $res = $q->fetchAll(\PDO::FETCH_ASSOC);
                    $status = 'success';
                } catch(\PDOException $e) {
                    $status = 'error';
                    $res = $e;
                }

                break;

            default:
                $status = 'error';
                $res = 'Unknoun Op';
                $cmt = $operation;
                $this -> log -> debug($res, [$operation]);
                break;
        }
        $ret = array('status' => $status,
            'result' => $res, 'data'=> $cmt);
        $this->returnResult($ret);

    }

}

// .............................................................................

$manager = new Maincntr($log, $_REQUEST);

if (!empty($_REQUEST) && isset($_REQUEST['operation'])) {
    $manager->manage($_REQUEST['operation'], $_REQUEST);
}
