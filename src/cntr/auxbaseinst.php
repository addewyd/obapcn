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
            //$this -> dbname = DBNAME;        
    }
    protected function createdb($sql) {
        $dbname = $this -> dbname;
        $db_settings = dbsettings();
        $host = $db_settings['host'];
        $username = $db_settings['user'];
        $password = $db_settings['pass'];

        $this -> pdo = new \PDO("mysql:host=$host", $username, $password);
        $this -> pdo ->exec("CREATE DATABASE `$dbname`;
            CREATE USER '$username'@'localhost' IDENTIFIED BY '$password';
            GRANT ALL ON `$dbname`.* TO '$username'@'localhost';
            FLUSH PRIVILEGES;"); 
        $this -> pdo ->exec("use `$dbname`");
        
        
        // exec sql
        $this -> pdo ->exec("CREATE TABLE IF NOT EXISTS `codes` (
            `ai` varchar(128) DEFAULT NULL,
            `ac` varchar(128) DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8");
        $this -> pdo ->exec("insert into codes values ('x','x')");
        
        $this -> pdo -> exec($sql);
    }

    protected function opendb() {
        $dbname = $this -> dbname;
        $db_settings = dbsettings();
        $host = $db_settings['host'];
        $username = $db_settings['user'];
        $password = $db_settings['pass'];
        try {
            $this -> pdo = new \PDO("mysql:dbname=$dbname;host=$host", $username, $password);
            $this -> pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);               
        } catch(\PDOException $e) {
            $this -> log -> debug('opendb', [$e]);   
            $this -> pdo = null;
        }
        return $this -> pdo;
    }
    
    // .........................................................................
    
    protected function closedb() {
        $this -> pdo = null;
    }
    
    // .........................................................................

    protected function set_codes($ai, $ac) {
        $this -> opendb();
        
        $sql = "update codes set ai=?, ac=?";
        $status = 'ok';
        $res = '';
        try {
            $q = $this -> pdo->prepare($sql);
            $q->execute([$ai, $ac]);
            $this -> log -> debug('set codes ok', [$this->dbname]);
        } catch (\PDOException $e) {
            $status = 'error';
            $this -> log -> debug('set codes', [$e, $this->dbname]);
            $res = $e;
        } catch (\Exception $e) {
            $status = 'error';
            $this -> log -> debug('set codes', [$e, $this->dbname]);
            $res = $e;            
        }
        
        $this -> closedb();
        return [$status, $res];
    }
}
