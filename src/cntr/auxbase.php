<?php
namespace Obapcn;

require_once './defines.php';

class AuxBase {
        public function __construct($log, $r) {
            $this->log = $log;
            $this -> params = $r;
            $this -> ai = '';
            $this -> ac = '';
            $this -> dbname = DBNAME;
            $dbname = $this -> dbname;
            
            $db_settings = dbsettings();
            $host = $db_settings['host'];
            $username = $db_settings['user'];
            $password = $db_settings['pass'];

        $this -> pdo = new \PDO("mysql:dbname=$dbname;host=$host", $username, $password);
        $this -> pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        
        
            $this -> get_codes();
            $log -> debug('PP codes', [$this->ai,$this->ac]);
// init lib
            $this -> obB24App = new \Bitrix24\Bitrix24(false, $log);
            $this -> obB24App->setApplicationScope([APP_SCOPE]);
        
            $ai = $this -> ai ? $this -> ai : APP_ID;
            $ac = $this -> ac ? $this -> ac : APP_SECRET_CODE;
        
            $this -> obB24App->setApplicationId($ai);
            $this -> obB24App->setApplicationSecret($ac);
// set user-specific settings
            $this -> obB24App->setDomain($r['domain']);
            $this -> obB24App->setMemberId($r['member_id']);
            $this -> obB24App->setAccessToken($r['access_token']);
            $this -> obB24App->setRefreshToken($r['refresh_token']);
        
    }
    
    protected function get_codes() {
        $sql = "select * from codes";
        try {
            $q = $this -> pdo->prepare($sql);
            $q->execute();
            $res = $q->fetchAll(\PDO::FETCH_ASSOC);
            if ($res) {
                $r = $res[0];
                $this->ai = $r['ai'];
                $this->ac = $r['ac'];
            }
        } catch (\PDOException $e) {
            $status = 'error';
            $log -> debug('get codes', [$e]);
            $res = $e;
        }
    }

    protected function set_codes($ai, $ac) {
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

    
    public function reformat_date($d) {
        $rd = $d;
        
        $m = preg_match('/\d{4}\-\d{2}\-\d{2}/', $d);
        if($m) {
            return $d;
        }
        
        $m = preg_match('/\d{1,2}\.\d{1,2}\.\d{4}/', $d);
        if($m) {
            $rd = date_format(
                date_create_from_format('d.m.Y', $d), 'Y-m-d');
            return $rd;
        }
        $m = preg_match('/\d{1,2}\.\d{1,2}\.\d{2}/', $d);
        if($m) {
            $rd = date_format(
                date_create_from_format('d.m.y', $d), 'Y-m-d');
            return $rd;
        }
        return $rd;
    }
}
