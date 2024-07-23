# redis_demo

commands 

DEL mykey
EXISTS mykey
KEYS *
KEYS user:*
RANDOMKEY
RENAME oldkey newkey
TYPE mykey


String commands

SET mykey "Hello, World!"
SETEX name 3600 "hello"       (3600-ttl)
GET mykey
INCR mycounter
DECR mycounter
APPEND mykey " More text"

hash commands

HSET myhash field1 "value1"
HMSET myhash field "hello" field2 "world"
HGET myhash field1
HDEL myhash field1
HGETALL myhash

list commands
LPUSH mylist "element1"
RPUSH mylist "element2"
LPOP mylist
RPOP mylist
LRANGE mylist 0 -1

set commands
SADD myset "member1"
SREM myset "member1"
SMEMBERS myset
SISMEMBER myset "member1"

sorted set commands
ZADD myzset 1 "member1"
ZREM myzset "member1"
ZRANGE myzset 0 -1

pub/sub commands

PUBLISH mychannel "Hello, Subscribers!"
SUBSCRIBE mychannel
UNSUBSCRIBE mychannel

flushdb
