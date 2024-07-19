<?php
  require_once("models/User.php");
  require_once("models/Message.php");


class UserDAO implements UserDAOInterface{

    private $conn;
    private $message;

    public function __construct(PDO $conn) {
        $this->conn = $conn;
        $this->message = new Message();
    }

    public function buildUser($data) {
        $user = new User();

        $user->id = $data["id"];
        $user->name = $data["name"];
        $user->lastname = $data["lastname"];
        $user->email = $data["email"];
        $user->password = $data["password"];
        $user->image = $data["image"];
        $user->bio = $data["bio"];
        $user->token = $data["token"];

        return $user;
    }
    public function create(User $user, $authUser = false) {
        $stmt = $this->conn->prepare("INSERT INTO users(name, lastname, email, password, token) VALUES(:name, :lastname, :email, :password, :token)");

        $stmt->bindParam(":name", $user->name);
        $stmt->bindParam(":lastname", $user->lastname);
        $stmt->bindParam(":email", $user->email);
        $stmt->bindParam(":password", $user->password);
        $stmt->bindParam(":token", $user->token);

        $stmt->execute();

        if($authUser) {
            $this->setTokenToSession($user->token);
        }
    }
    public function update(User $user) {

    }
    public function verifyToken($protected = false) {

    }
    public function setTokenToSession($token, $redirect = true) {

        $_SESSION["token"] = $token;

        if($redirect) {
            // redireciona para o perfil do usuario
            $this->message->setMessage("Seja bem vindo(a)!", "sucess", "editprofile.php");
        }
    }
    public function authenticateUser($email, $password) {

    }
    public function findByEmail($email) {
        if($email != "") {
            $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");

            $stmt->bindParam(":email", $email);

            $stmt->execute();

            if($stmt->rowCount() > 0) {
                $data = $stmt->fetch();

                $user = $this->buildUser($data);

                return $user;
            } else {
                return false;
            }
        }
    }
    public function findById($id) {

    }
    public function findByToken($token) {

    }
    public function changePassword(User $user) {

    }
}