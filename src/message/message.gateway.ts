import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageService } from './message.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateMsgDto } from './dto/create-message.dto';


@WebSocketGateway(11111, { 
  transports: ['polling'],
  cors: {
    origin: '*'
  } 
})
export default class MessageGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly messageService: MessageService,   
    private  jwtService: JwtService,
    private userService: UserService
    ) {}

  @WebSocketServer() server: Server;
  
  
  @SubscribeMessage('sendMessage')
  async handleSendMessage(socket: Socket, payload: CreateMsgDto): Promise<void> {
    const token = socket.handshake.headers.authorization;
    const check = await this.jwtService.verifyAsync(token, { 
      secret: process.env.JWT_SECRET
    });
    payload['senderId'] = check['sub']
    this.server.emit('recMessage', payload);
    await this.messageService.CreateMessage(payload)
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(socket: Socket, payload: any) {

  }

  @SubscribeMessage('onTypingStart')
  async onTypingStart(
    @ConnectedSocket() client: Socket,
  ) {
    const token = client.handshake.headers.authorization;
    const check = await this.jwtService.verifyAsync(token, { 
      secret: process.env.JWT_SECRET
    });
    console.log('onTypingStart');
    console.log(check['sub']);
    console.log(client.rooms);
    client.to(`conversation-${check['sub']}`).emit('onTypingStart');
  }

  afterInit(server: Server) {
    // console.log(server);
    //Do stuffs
  }
  
  async handleDisconnect(socket: Socket): Promise<void> {
    console.log("user disconnect")
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
    console.log("user connect")
    //   const token = socket.handshake.headers.authorization;
    //   try {
    //     if(!token) {
    //       return this.disconnect(socket);
    //     }
    //     const check = await this.jwtService.verifyAsync(token, { 
    //       secret: process.env.JWT_SECRET
    //     });
    //     const user = await this.userService.getUserById(check['sub'])
    //     if(!user) {
    //       return this.disconnect(socket);
    //     }
    //     await this.userService.UserStatus(user['id'], true);
    // } catch (error) {
    //   return this.disconnect(socket);
    // }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log(777, payload)
    this.server.emit('onMessageSend', payload);
  }

  @OnEvent('message.delete')
  handleMessageDeleteEvent(payload: any) {
    console.log(777, payload)
    this.server.emit('onMessageDelete', payload);
  }

  @OnEvent('message.update')
  handleMessageUpdateEvent(payload: any) {
    console.log(777, payload)
    this.server.emit('onMessageUpdate', payload);
  }
    
}

