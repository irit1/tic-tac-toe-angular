import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from './board/board.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    message: string;
    showRestart = false;

    @ViewChild(BoardComponent) board: BoardComponent;

    onPlayerTurn(playerNum: number) {
        this.message = `It's you turn player ${playerNum}`;
    }

    onPlayerWon(playerNum: number) {
        this.message = `Player ${playerNum} won !!!`;
        this.showRestart = true;
    }

    onTie() {
        this.message = "it's a tie !!!";
        this.showRestart = true;
    }

    onRestart() {
        this.board.resetBoard();
        this.showRestart = false;
    }
}
