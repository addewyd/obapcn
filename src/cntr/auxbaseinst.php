<?php
namespace Obapcn;

require_once './defines.php';

class AuxBaseInst {
        public function __construct($log, $r) {
            $this->log = $log;
            $this -> params = $r;
            $this -> ai = '';
            $this -> ac = '';
            
            $this -> dbname = $r['dbname'];
            
// debug            
$this -> dbname = DBNAME;        
    }
    protected function opendb() {
            $dbname = $this -> dbname;
            
            $db_settings = dbsettings();
            $host = $db_settings['host'];
            $username = $db_settings['user'];
            $password = $db_settings['pass'];

            $this -> pdo = new \PDO("mysql:dbname=$dbname;host=$host", $username, $password);
            $this -> pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
               
    }
    
    protected function set_codes($ai, $ac) {
        $this -> opendb();
        
        $sql = "update codes set ai=?, ac=?";
        $status = 'ok';
        $res = '';
        try {
            $q = $this -> pdo->prepare($sql);
            $q->execute([$ai, $ac]);
        } catch (\PDOException $e) {
            $status = 'error';
            $log -> debug('get codes', [$e]);
            $res = $e;
        }
        return [$status, $res];
    }
}
