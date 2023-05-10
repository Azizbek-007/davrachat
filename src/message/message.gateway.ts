import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { PrivateMessage } from './entities/message.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';


@WebSocketGateway()
export default class MessageGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly messageService: MessageService,  
    private  jwtService: JwtService,
    private userService: UserService
    ) {}

  @WebSocketServer() server: Server;
  
  
  @SubscribeMessage('sendMessage')
  async handleSendMessage(socket: Socket, payload: any): Promise<void> {
    const token = socket.handshake.headers.authorization;
    const check = await this.jwtService.verifyAsync(token, { 
      secret: process.env.JWT_SECRET
    });

    this.server.emit('recMessage', {...payload, user_id: check['sub']});
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }
  
  async handleDisconnect(socket: Socket) {
    const token = socket.handshake.headers.authorization;
    try {
      const check = await this.jwtService.verifyAsync(token, { 
        secret: process.env.JWT_SECRET
      });
      await this.userService.UserStatus(check['sub'], false); 
    } catch (error) {
      return this.disconnect(socket);
    }
  }
  
  async handleConnection(socket: Socket) {
      const token = socket.handshake.headers.authorization;
      try {
        if(!token) {
          return this.disconnect(socket);
        }
        const check = await this.jwtService.verifyAsync(token, { 
          secret: process.env.JWT_SECRET
        });
        const user = await this.userService.getUserById(check['sub'])
        if(!user) {
          return this.disconnect(socket);
        }
        await this.userService.UserStatus(user['id'], true);
    } catch (error) {
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
    
}

