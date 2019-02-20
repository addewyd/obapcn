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
        catch(Exception $e) {
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
